<template>
    <el-menu default-active="2" class="el-menu-vertical-demo"  router >
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>基本信息</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/adminmains/webinfo">
                   网站信息
                </el-menu-item>
                <el-menu-item index="1-2">个人资料</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>内容管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/adminmains/cate">
                    分类管理
                </el-menu-item>
                <el-menu-item index="/adminmains/goods">商品管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "myaside"
    }
</script>

<style scoped>

</style>