/* 主页随机数据配置文件 */
import Mock from 'mockjs'

//  图表数据
let List = []
export default {
    getHomeData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    vue: Mock.Random.float(500, 8000, 0, 2),
                    wechat: Mock.Random.float(500, 8000, 0, 2),
                    ES6: Mock.Random.float(500, 8000, 0, 2),
                    Redis: Mock.Random.float(500, 8000, 0, 2),
                    React: Mock.Random.float(500, 8000, 0, 2),
                    springboot: Mock.Random.float(500, 8000, 0, 2)
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '木槌',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: '铰链',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: '滑轨',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: '玻璃',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: '衣通',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: '灯条',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: '广西',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '河北',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '湖北',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '四川',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '上海',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '浙江',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '河南',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    }
                ],
                // 折线图
                orderData: {
                    date: [
                        '20191001',
                        '20191002',
                        '20191003',
                        '20191004',
                        '20191005',
                        '20191006',
                        '20191007'
                    ],
                    data: List
                },
                tableData: [
                    {
                        name: '有效',
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: '无效',
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: 'Vue',
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: 'springboot',
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: 'React',
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    },
                    {
                        name: 'Redis',
                        todayBuy: Mock.Random.float(100, 1000, 0, 2),
                        monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                        totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                    }
                ]
            }
        }
    }
}
