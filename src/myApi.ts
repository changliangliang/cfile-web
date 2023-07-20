/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 用户信息 */
export interface User {
  /**
   * id值
   * @format int32
   */
  id?: number
  /** 用户名 */
  username?: string
  /** 密码 */
  password?: string
  /** 邮箱 */
  email?: string
  /**
   * 创建时间
   * @format date-time
   */
  created?: string
  /**
   * 更新时间
   * @format date-time
   */
  updated?: string
  /**
   * 是否删除：0-未删除，1-删除
   * @format int32
   */
  deleted?: number
  /**
   * 用户角色：0-普通用户，1-管理员用户
   * @format int32
   */
  role?: number
}

/** Result对象 */
export interface ResultUser {
  /**
   * 响应码
   * @format int32
   */
  code?: number
  /** 返回信息 */
  message?: string
  /** 用户信息 */
  data?: User
}

/** File对象 */
export interface File {
  /**
   * id值
   * @format int32
   */
  id?: number
  /**
   * 所有者id
   * @format int32
   */
  onwer?: number
  /** 文件名字 */
  name?: string
  /** uuid */
  uuid?: string
  /** 文件类型 */
  type?: string
  /**
   * 下载量
   * @format int32
   */
  downloadCount?: number
  /**
   * 浏览量
   * @format int32
   */
  viewCount?: number
  /**
   * 点赞量
   * @format int32
   */
  likeCount?: number
  /**
   * 创建时间
   * @format date-time
   */
  created?: string
  /**
   * 更新时间
   * @format date-time
   */
  updated?: string
  /** 是否删除：0-未删除，1-删除 */
  deleted?: boolean
}

/** Result对象 */
export interface ResultFile {
  /**
   * 响应码
   * @format int32
   */
  code?: number
  /** 返回信息 */
  message?: string
  /** File对象 */
  data?: File
}

/** Comment对象 */
export interface Comment {
  /**
   * id值
   * @format int32
   */
  id?: number
  /**
   * 所有者id
   * @format int32
   */
  onwer?: number
  /**
   * 点赞数
   * @format int32
   */
  likeCount?: number
  /**
   * 创建时间
   * @format date-time
   */
  created?: string
  /**
   * 更新时间
   * @format date-time
   */
  updated?: string
  /** 是否删除：0-未删除，1-删除 */
  deleted?: boolean
  /**
   * 评论的文件id
   * @format int32
   */
  file?: number
}

/** Result对象 */
export interface ResultComment {
  /**
   * 响应码
   * @format int32
   */
  code?: number
  /** 返回信息 */
  message?: string
  /** Comment对象 */
  data?: Comment
}

/** Result对象 */
export interface ResultListUser {
  /**
   * 响应码
   * @format int32
   */
  code?: number
  /** 返回信息 */
  message?: string
  /** 返回数据 */
  data?: User[]
}

/** Result对象 */
export interface ResultListFile {
  /**
   * 响应码
   * @format int32
   */
  code?: number
  /** 返回信息 */
  message?: string
  /** 返回数据 */
  data?: File[]
}

/** Result对象 */
export interface ResultListComment {
  /**
   * 响应码
   * @format int32
   */
  code?: number
  /** 返回信息 */
  message?: string
  /** 返回数据 */
  data?: Comment[]
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://localhost:12345'
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Cfile API
 * @version v0.0.1
 * @license Apache 2.0 (http://www.cfile.com)
 * @baseUrl http://localhost:12345
 * @contact chang <changliangliang1996@foxmail.com> (http://changliangliang.github.io)
 *
 * 一个在线文件解析网站
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags 用户接口
     * @name ModifyUser
     * @summary 修改用户信息
     * @request PUT:/user
     */
    modifyUser: (data: User, params: RequestParams = {}) =>
      this.request<ResultUser, any>({
        path: `/user`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags 用户接口
     * @name Register
     * @summary 注册用户
     * @request POST:/user/register
     */
    register: (data: User, params: RequestParams = {}) =>
      this.request<ResultUser, any>({
        path: `/user/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags 用户接口
     * @name GetUser
     * @summary 获取用户信息
     * @request GET:/user/{id}
     */
    getUser: (id: number, params: RequestParams = {}) =>
      this.request<ResultUser, any>({
        path: `/user/${id}`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags 用户接口
     * @name DeleteUser
     * @summary 删除用户
     * @request DELETE:/user/{id}
     */
    deleteUser: (id: number, params: RequestParams = {}) =>
      this.request<ResultUser, any>({
        path: `/user/${id}`,
        method: 'DELETE',
        ...params
      }),

    /**
     * No description
     *
     * @tags 用户接口
     * @name ListUser
     * @summary 分页获取用户信息
     * @request GET:/user/list
     */
    listUser: (
      query: {
        /** @format int32 */
        size: number
        /** @format int32 */
        page: number
        /** @format int32 */
        order: number
        isAsc: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<ResultListUser, any>({
        path: `/user/list`,
        method: 'GET',
        query: query,
        ...params
      })
  }
  file = {
    /**
     * No description
     *
     * @tags 文件接口
     * @name UploadFile
     * @summary 上传文件
     * @request POST:/file/upload
     */
    uploadFile: (
      data: {
        /** @format binary */
        file: File
      },
      query?: {
        filename?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ResultFile, any>({
        path: `/file/upload`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params
      }),

    /**
     * No description
     *
     * @tags 文件接口
     * @name GetFileInfo
     * @summary 获取文件信息
     * @request GET:/file/{id}
     */
    getFileInfo: (id: number, params: RequestParams = {}) =>
      this.request<ResultFile, any>({
        path: `/file/${id}`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags 文件接口
     * @name DeleteFile
     * @summary 删除文件
     * @request DELETE:/file/{id}
     */
    deleteFile: (id: number, params: RequestParams = {}) =>
      this.request<ResultFile, any>({
        path: `/file/${id}`,
        method: 'DELETE',
        ...params
      }),

    /**
     * No description
     *
     * @tags 文件接口
     * @name ListFile
     * @summary 获取用户所有文件
     * @request GET:/file/list
     */
    listFile: (
      query: {
        /** @format int32 */
        size: number
        /** @format int32 */
        page: number
        /**
         * @format int32
         * @default -1
         */
        owner?: number
        /** @format int32 */
        order: number
        isAsc: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<ResultListFile, any>({
        path: `/file/list`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags 文件接口
     * @name LikeFile
     * @summary 点赞
     * @request GET:/file/like/{id}
     */
    likeFile: (id: number, params: RequestParams = {}) =>
      this.request<ResultListFile, any>({
        path: `/file/like/${id}`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags 文件接口
     * @name DownloadFile
     * @summary 下载文件
     * @request GET:/file/download/{id}
     */
    downloadFile: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/file/download/${id}`,
        method: 'GET',
        ...params
      })
  }
  comment = {
    /**
     * No description
     *
     * @tags 评论接口
     * @name AddComment
     * @summary 添加评论
     * @request POST:/comment
     */
    addComment: (data: Comment, params: RequestParams = {}) =>
      this.request<ResultComment, any>({
        path: `/comment`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags 评论接口
     * @name ListComment
     * @summary 分页获取评论
     * @request GET:/comment/list
     */
    listComment: (
      query: {
        /** @format int32 */
        size: number
        /** @format int32 */
        page: number
        /**
         * @format int32
         * @default -1
         */
        owner?: number
        /**
         * @format int32
         * @default -1
         */
        file?: number
        /**
         * @format int32
         * @default -1
         */
        order?: number
        /** @default false */
        isAsc?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<ResultListComment, any>({
        path: `/comment/list`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags 评论接口
     * @name DeleteUser1
     * @summary 删除评论
     * @request DELETE:/comment/{id}
     */
    deleteUser1: (id: number, params: RequestParams = {}) =>
      this.request<ResultComment, any>({
        path: `/comment/${id}`,
        method: 'DELETE',
        ...params
      })
  }
}
