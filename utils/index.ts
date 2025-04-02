export function handleApiError(msg:string,error: any) {
    if (error.response) {
      if(msg) {
        console.error(msg, error.response.data.message);
      }else{
      console.error(   'API error: ', error.response.data.message);
      }
      throw new Error(error.response.data.message || 'Something went wrong');
    } else if (error.request) {
      console.error('No response from server', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message || 'An unknown error occurred');
    }
  }