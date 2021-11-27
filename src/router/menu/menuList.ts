const menu = [
    {
        icon: 'HomeFilled',
        index: '/panel',
        title: '系统首页'
    },
    {
        icon: 'Setting',
        index: '/setting',
        title: '轮播设置'
    },
    {
        icon: 'List',
        index: '3',
        title: '音乐列表',
        subs: [
            {
                index: '/add',
                title: '添加音乐'
            },
            {
                index: '/manage',
                title: '管理音乐'
            }
        ]
    },
    {
        icon:'UserFilled',
        index:'/user',
        title:'用户列表'
    }
]

export {
    menu
}