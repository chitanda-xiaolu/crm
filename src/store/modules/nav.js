
export default {
    'state': {
        'collapse': false,                          // 侧边栏折叠
        'tagsList': []
    },
    'mutations': {
        'SET_COLLAPSE': (state, data) => {
            state.collapse = data
        },
        'SET_TAGSLIST': (state, data) => {
            state.tagsList = data || []
        },
        'CLOSE_CURRENT_PAGE': (state, path) => {    // 关闭当前页
            state.tagsList = state.tagsList.filter(function(item) {
                return item.path !== path
            })
        }
    }
}
