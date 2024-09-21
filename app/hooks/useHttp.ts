import { useState } from 'react';
const baseAPIUrl = 'https://apigw.mweb.co.za/prod/baas/proxy/marketing';

export type HttpUseModel<T> = {
  onError?: (error: unknown) => void,
  onSuccess?: (data: T) => void
}

export interface HttpUseHookResult<T> {
  isLoading: boolean;
  launchRequest: (url: string | string[], requestInit?: RequestInit) => void;
  data?: T;
}

function useHttp<T>(config?: HttpUseModel<T> & {
  onRequestStart?: () => void,
  onRequestSuccess?: (data: unknown) => void,
  onRequestFailure?: (error: unknown) => void,
  onRequestComplete?: () => void
}): HttpUseHookResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const launchRequest = (url: string | string[], requestInit: RequestInit = {
    method: 'get',
  }) => {
    //emit request start.
    if (config?.onRequestStart) {
      config.onRequestStart();
    }

    //start the loading.
    setIsLoading(true);

    const urlIsArray = Array.isArray(url);

    console.log(setData)
    if (!urlIsArray) {
      // @ts-expect-error This is the desired behavior.
      url = [url];
    }

    //config axios multi
    const requests = (url as Array<string>).map(uri => {
      return fetch(`${baseAPIUrl}${uri}`, requestInit);
    })

    Promise.all(requests)
      .then(res => res.map(r => r.json()))
      .then(res => {
        console.log(res);
/*        if (!urlIsArray) {
          setData(res[0]);
        } else {
          setData(res.map(item => item.data) as unknown as T);
        }*/
      });
  }

  return {
    isLoading,
    launchRequest,
    data
  };
}

export default useHttp;