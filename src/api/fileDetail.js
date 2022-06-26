import request from "@/utils/request";

export function saveDetail(fileDetail) {
    return request({
        url: '/fileDetail/save',
        method: 'post',
        data: fileDetail
    })
}

export function updateDetail(fileDetail) {
    return request({
        url: '/fileDetail/update',
        method: 'post',
        data: fileDetail
    })
}

export function findByDetailId(fileDetailId) {
    return request({
        url: `/fileDetail/findByFileDetailId/${fileDetailId}`,
        method: 'post'
    })
}