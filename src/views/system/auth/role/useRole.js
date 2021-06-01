import { reactive, toRefs, ref } from 'vue'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import { getRoleList, getRoleInfo, getMenuList} from '@/api/user'
import {deepTree} from '@/utils'
import dayjs from 'dayjs'

export default function(){

    const dataForm = ref(null);
    const state = reactive({
        pagination: {
            pageNo: 1,
            pageSize: 10,
        },
        list: [],
        searchKey: '',
        checkIdList: [],
        dialogTitleMap: {
            update: "Edit",
            create: "Create",
        },
        dialogStatus: "",
        dialogFormVisible: false,

        menuList:[],
        temp: {
            id: undefined,
            name: "",
            label: "",
            create_at: undefined,
            remark: "",
            menuIdList:[]
        },
        rules: {
            name: [{ required: true, message: "名称必须", trigger: "blur" }],
            label: [{ required: true, message: "标识必须", trigger: "blur" }],
        },
    })


    // 查询角色列表
    async function queryRoleList() {
        let payload = {
            ...state.pagination,
            searchKey: state.searchKey
        };
        const result = await getRoleList(payload)
        if (result.code === 200) {
            const { rows, ...pagination } = result.data;
            state.list = rows;
            state.pagination = pagination;
        }  state.temp = result.data;
    }

    const queryMenuList = async () => {
        const result = await getMenuList();
        if (result.code == 200) {
            state.menuList = deepTree(result.data);
        }
    };

    // 重置页码
    const resetPagination = () => {
        state.pagination.pageNo = 1;
    }

    // 记录选中
    const handleSelectionChange = (val) => {
        let ids = val.map((e) => e.id)
        state.checkIdList = ids;
    }

    // 切换每页条数
    const handleSizeChange = (size) => {
        state.pagination.pageSize = size;
        queryRoleList();
    };

    // 搜索
    const handleSearch = () => {
        resetPagination();
        queryRoleList()
    }

    // 切换页码
    const handleCurrentChange = (pageNo) => {
        state.pagination.pageNo = pageNo;
        queryRoleList();
    };

    // 刷新
    const refresh = () => {
        queryRoleList();
    };

    // 批量删除
    const handleDestory = () => {
        if (state.checkIdList.length == 0) {
            ElMessage.warning('请选择角色')
            return false
        }
        ElMessageBox.confirm('此操作将永久删除选中数据，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let list = [...state.list];
            state.list = list.filter((e) => !state.checkIdList.includes(e.id))
            console.log(state.list);
            ElMessage.success('删除成功!')
        }).catch(() => {
            console.log('已取消删除');
        })
    };

    // 单个删除
    const handleDelete = (index) => {
        let item = state.list[index];
        ElMessageBox.confirm(`是否删除角色 ${item.name}？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            queryRoleList();
            ElMessage.success('删除成功!')
        }).catch(() => {
            console.log('已取消删除');
        })
    }

    const resetTemp = () => {
        state.temp = {
            id: undefined,
            name: "",
            label: "",
            create_at: undefined,
            remark: "",
            menuIdList: []
        }
    }

    const handleCreate = () => {
        resetTemp()
        state.dialogStatus = 'create';
        state.dialogFormVisible = true;
    }

    const handleEdit = async (row) => {
        let id = row.id;
        const result = await getRoleInfo({ id })
        if (result.code === 200) {
            state.temp = Object.assign({}, row);
            state.temp.menuIdList = result.data.menuIdList;
            state.dialogStatus = "update";
            state.dialogFormVisible = true;
        }
    };

    const createData = () => {
        dataForm.value.validate((valid) => {
            if (valid) {
                state.temp.id = parseInt(Math.random() * 100) + 1024;
                state.temp.create_at = dayjs().format('YYYY-MM-DD h:i:s');
                console.log(state.temp);
                state.list.unshift(state.temp)
                state.dialogFormVisible = false;
                ElNotification({
                    title: "Success",
                    message: "创建成功",
                    type: "success",
                    duration: 2000,
                });
            }
        });
    }

    const updateData = () => {
        dataForm.value.validate((valid) => {
            if (valid) {
                const index = state.list.findIndex(
                    (v) => v.id === state.temp.id
                );
                state.list.splice(index, 1, state.temp);
                state.dialogFormVisible = false;
                ElNotification({
                    title: "Success",
                    message: "更新完成",
                    type: "success",
                    duration: 2000,
                });
            }
        });
    }

    return {
        dataForm,
        ...toRefs(state),
        queryRoleList,
        queryMenuList,
        refresh,
        handleSearch,
        handleSelectionChange,
        handleSizeChange,
        handleCurrentChange,
        handleDestory,
        handleDelete,
        handleCreate,
        handleEdit,
        createData,
        updateData,
    }
}