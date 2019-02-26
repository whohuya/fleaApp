const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

export function parseJSON (response) {
  if (response.status !== 204) {
    return response.json()
  }
  return '{}'
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export const handleError = async (error)=> {
  try {
    switch (error.message) {
      case 'Failed to fetch':
        console.warn('网络连接错误，请检查您的网络设置，或联系系统管理员')
        return
    }
    const errorMessage = await error.response.json()
    // console.log(errorMessage.detail)
    const btn = (
      <Button
        type='primary'
        size='small'
        onClick={() => {
          notification.close('re-login')
        }}
      >
        确定
      </Button>
    )
    switch (errorMessage.detail) {
      case 'Signature has expired.':
        notification.error({
          message: '请重新登录',
          description: '您的登陆信息已过期，请重新登录',
          duration: 0,
          btn,
          key: 're-login'
        })
        return
      case 'Invalid Authorization header. No credentials provided.':
        notification.error({
          message: '发生错误',
          description: '无效的用户状态，请重新登录'
        })
        return
      default:
        const errorText =
          codeMessage[error.response.status] || error.response.statusText
        notification.error({
          message: `请求错误 ${error.response.status}`,
          description: errorText
        })
    }
  } catch (error) {
    // console.log(error)
    message.error('发生错误')
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  const defaultOptions = {}
  const newOptions = { ...defaultOptions, ...options }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH'
  ) {
    if (!newOptions.form) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...newOptions.headers
      }
      newOptions.body = JSON.stringify(newOptions.body)
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      handleError(error)
      // throw error
    })
}
