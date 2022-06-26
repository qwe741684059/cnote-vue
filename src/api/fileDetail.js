import request from "@/utils/request";

export function saveDetail(fileDetail) {
    return request({
        url: '/fileDetail/save',
        method: 'post',
        data: fileDetail
    })
}