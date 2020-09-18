import request from '@/utils/requestMap'
import SYSTEMVALUE from '@/utils/config'
/**
 * 根据名称定位
 * @param {Object} query
 */
export function getLocationFromName(query) {
    return request({
        'method': 'get',
        'params': {
            query: query.name,
            region: query.region,
            city_limit: true,
            output: 'json',
            page_size: 1,
            ak: SYSTEMVALUE.BAIDU_MAP_KEY
        }
    })
}
