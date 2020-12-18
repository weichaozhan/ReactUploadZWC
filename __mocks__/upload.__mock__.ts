export default function http(params: any) {
  console.log('params', params);
  return new Promise((resolve) => {
    resolve({
      status: 200,
      statusText: 'success'
    });
  });
}