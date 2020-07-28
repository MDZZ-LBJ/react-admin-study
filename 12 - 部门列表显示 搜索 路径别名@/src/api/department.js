import service from '../utils/request'


export function DepartmentAddApi(data){
  return  service.request({
            url:'/department/add/',
            method:'post',
            data,   // post
        })
}




export function GetList(data){
    return  service.request({
        url:'/department/list/',
        method:'post',
        data,   // post
    })
}

export function Delete(data){
    return  service.request({
        url:'/department/delete/',
        method:'post',
        data,   // post
    })
}
