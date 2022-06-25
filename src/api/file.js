import request from "@/utils/request";

export function findTree() {
    return request({
        url: '/file/findTree',
        method: 'get'
    })
}

export function findAllByPath(path) {
    return request({
        url: '/file/findAllByPath',
        method: 'post',
        data: path
    })
}