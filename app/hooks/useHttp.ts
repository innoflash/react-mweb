import { useState } from 'react';

const baseAPIUrl = 'https://apigw.mweb.co.za/prod/baas/proxy/marketing';

export interface HttpUseHookResult<T> {
  isLoading: boolean;
  launchRequest: (url: string | string[], requestInit?: RequestInit) => void;
  data?: T;
}

function useHttp<T>(config?: {
  onRequestStart?: () => void,
  onRequestSuccess?: (data: T) => void,
  onRequestFailure?: (error: unknown) => void,
  onRequestComplete?: () => void
}): HttpUseHookResult<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const launchRequest = (url: string | string[], requestInit: RequestInit = { method: 'get' }) => {
    //start the loading.
    setIsLoading(true);

    //emit request start.
    if (config?.onRequestStart) {
      config.onRequestStart();
    }

    const urlIsArray = Array.isArray(url);
    if (!urlIsArray) {
      // @ts-expect-error This is the desired behavior.
      url = [url];
    }

    //config multiple requests.
    const requests = (url as Array<string>).map(uri => {
      return fetch(`${ baseAPIUrl }${ uri }`, requestInit);
    })

    Promise.all(requests)
      .then(res => res.map(r => r.json()))
      .then(async res => {
        let serverData = await Promise.all(res);

        if (!urlIsArray) {
          serverData = serverData[0];
          setData(serverData[0]);
        } else {
          setData(serverData as unknown as T);
        }

        // emit request success.
        if (config?.onRequestSuccess) {
          config.onRequestSuccess(serverData as T);
        }
      })
      .catch(error => {
        if (config?.onRequestFailure) {
          config.onRequestFailure(error);
        }
      })
      .finally(() => {
        setIsLoading(false);

        if (config?.onRequestComplete) {
          config.onRequestComplete();
        }
      });
  }

  return {
    isLoading,
    launchRequest,
    data
  };
}

export default useHttp;