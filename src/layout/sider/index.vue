<template>
    <div class="sider-wrap">
        <!-- <div class="logo">
            <div class="logo-title" v-if="!menuCollapse">Vue Admin</div>
            <div class="logo-title" v-else>Admin</div>
        </div> -->
        <div class="menu">
            <sider-menu  :collapse="menuCollapse"/>   
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import siderMenu from './sider-menu';
export default {
    components:{siderMenu},
    setup (){
        const store = useStore();
        const menuCollapse = computed(()=>{
            return store.getters.menuCollapse;
        })
        return {
            menuCollapse
        }
    }
}
</script>

<style lang="scss" scoped>
.sider-wrap{
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;

        .logo-title{
            color: #fff;
            font-size: 30px;
        }
    }

    .menu{
        overflow-y: auto;
        height: calc(100% - 120px);

        &::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
    }
}
</style>