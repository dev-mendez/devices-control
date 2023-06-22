import {useState, useEffect} from 'react';
import { Notifications } from '@/components/common/Notifications';

interface useHttpParams<T> {
  factory: () => Promise<Response>;
  onComplete?: (data: any)=> void;
  onError?: (error: unknown)=> void;
  shouldCallOnFirstRender?: boolean;
}

export function useHttp<T>({
  factory, 
  onComplete, 
  onError, 
  shouldCallOnFirstRender = true
}: useHttpParams<T>) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>();
    const [error, setError] = useState<unknown>();

    const refetch = async ()=>{
       try {
        setLoading(true);
        const response = await factory();

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json(); 
        setData(data);
        onComplete?.(data);

       } catch (error) {
           setError(error)
           onError?.(error)
           Notifications('error', "Ops something went wrong!");
       } finally {
           setLoading(false);
       } 
    }

    useEffect(()=>{
      if(shouldCallOnFirstRender) refetch();     
    },[shouldCallOnFirstRender])

    return { loading, data, error, refetch };
}