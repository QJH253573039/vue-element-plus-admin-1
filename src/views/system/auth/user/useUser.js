import { reactive, toRefs, ref } from 'vue'
import { getUserList } from '@/api/user';
import { ElMessageBox, ElMessage, ElNotification} from 'element-plus'
import dayjs from 'dayjs'


export default function () {
    const dataForm = ref(null);
    const state = reactive({
        pagination: {
            pageNo: 1,
            pageSize: 10,
        },
        list: [],
        statusOptions: {
            0: "禁用",
            1: "启用",
        },
        searchKey:'',
        checkIdList:[],
        dialogTitleMap: {
            update: "Edit",
            create: "Create",
        },
        dialogStatus: "",
        dialogFormVisible: false,

        temp: {
            id: undefined,
            name: "",
            username:"",
            nickname:"",
            create_at: undefined,
            status: 1,
            avatar:'',
            departmentName:"",
            email:"",
            roleName:"",
            phone:"",
            remark:""
        },
        rules: {
            name: [{ required: true, message: "姓名必须", trigger: "blur" }],
            username: [{ required: true, message: "用户名必须", trigger: "blur" }],
            nickname: [{ required: true, message: "昵称必须", trigger: "blur" }],
            departmentName: [{ required: true, message: "部门必须", trigger: "blur" }],
            roleName: [{ required: true, message: "角色必须", trigger: "blur" }],
        },

        roleList: ['开发', '游客', '测试', '管理员', 'Root', '产品', '商务'],
        departmentList:['开发', '游客', '测试', '管理员', 'Root', '产品', '商务'],
    })

    // 查询用户
    async function queryUserList() {
        let payload = {
            ...state.pagination,
            searchKey: state.searchKey
        };
        const result = await getUserList(payload)
        if (result.code === 200) {
            const { rows, ...pagination } = result.data;
            state.list = rows;
            state.pagination = pagination;
        }
    }

    // 重置页码
    const resetPagination = () => {
        state.pagination.pageNo = 1;
    }

    // 记录选中
    const handleSelectionChange = (val) => {
        let ids = val.map((e)=>e.id)
        state.checkIdList = ids;
    }

    // 切换每页条数
    const handleSizeChange = (size) => {
        state.pagination.pageSize = size;
        queryUserList();
    };

    // 切换页码
    const handleCurrentChange = (pageNo) => {
        state.pagination.pageNo = pageNo;
        queryUserList();
    };

    // 搜索
    const handleSearch = () => {
        resetPagination();
        queryUserList()
    }

    // 刷新
    const refresh = () => {
        queryUserList();
    };

    // 批量删除
    const handleDestory = () => {
        if (state.checkIdList.length == 0){
            ElMessage.warning('请选择用户')
            return false
        }
        ElMessageBox.confirm('此操作将永久删除选中数据，是否继续？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            let list = [...state.list];
            state.list = list.filter((e) => !state.checkIdList.includes(e.id))
            console.log(state.list);
            ElMessage.success('删除成功!')
        }).catch(()=>{
            console.log('已取消删除');
        })
    };

    // 单个删除
    const handleDelete = (index) => {
        let item = state.list[index];
        ElMessageBox.confirm(`是否删除用户 ${item.name}？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            queryUserList();
            ElMessage.success('删除成功!')
        }).catch(() => {
            console.log('已取消删除');
        })
    }

    const resetTemp = () => {
        state.temp = {
            id: undefined,
            name: "",
            username: "",
            nickname: "",
            create_at: undefined,
            status: 1,
            avatar: '',
            departmentName: "",
            email: "",
            roleName: "",
            phone: "",
            remark: ""
        }
    }

    const handleCreate = () => {
        resetTemp()
        state.dialogStatus = 'create';
        state.dialogFormVisible = true;
    }

    const handleEdit = (row) => {
        state.temp = Object.assign({}, row);
        state.dialogStatus = "update";
        state.dialogFormVisible = true;
    };

    const createData = () => {
        dataForm.value.validate((valid) => {
            if (valid) {
                state.temp.id = parseInt(Math.random() * 100) + 1024;
                state.temp.create_at = dayjs().format('YYYY-MM-DD h:i:s');

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

    const handleAvatarSuccess = (res, file) => {
        state.temp.avatar = URL.createObjectURL(file.raw);
    }

    const beforeAvatarUpload = (file) => {
        const fileType = ["image/jpeg", "image/png"];
        const isJPG = fileType.includes(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            ElMessage.error("上传头像图片只能是 JPG、PNG 格式!");
        }
        if (!isLt2M) {
            ElMessage.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
    }

    return {
        ...toRefs(state),
        dataForm,
        queryUserList,
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
        handleAvatarSuccess,
        beforeAvatarUpload,
    }
}