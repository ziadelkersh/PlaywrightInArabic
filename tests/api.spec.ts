import { test, expect , request } from '@playwright/test';
let objectID = null;
const baseURL = 'https://api.restful-api.dev/';
const objetcPath = 'objects'
const fullurlwithobjectpath = baseURL + objetcPath;
let fullpathwithID ;

test('get api' , async({request})=>{
    const startingTime = Date.now();
    const response = 
    await request.get(fullurlwithobjectpath);
    let responsebody = await response.json();
    let responseheaders = response.headers();
    console.log(responsebody)
    expect(response.status()).toBe(200);
    expect(responsebody[0].id).toBe('1');
    console.log(responseheaders)
    expect(responseheaders['content-type']).toContain('application/json');
    let responsesize =(await response.body()).byteLength;
    expect(responsesize).toBeLessThan(4000);
    console.log(responsesize);
    let responseTime = Date.now() - startingTime;
    console.log(responseTime)
    expect (responseTime).toBeLessThan(4000);

})

test('post API', async ({request})=>{
    const playload = {
        "name": "Apple MacBook Pro 16",
   "data": {
      "year": 2019,
      "price": 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB"
   }
    }

   const response = await request.post(fullurlwithobjectpath,{
        data:playload

    })
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toContain(playload.name);
    objectID = responseBody.id;
    fullpathwithID = fullurlwithobjectpath+'/'+objectID

})
//id: 'ff8081819782e69e019a54f1899b616f'

test('put API', async ({request})=>{
    const playload = {
        "name": "Apple MacBook Pro 11",
   "data": {
      "year": 2019,
      "price": 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB"
   }
    }

   const response = await request.put(fullpathwithID,{
        data:playload

    })
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toContain(playload.name);
    //let objectID = responseBody.id;
})
test('patch API', async ({request})=>{
    const playload = {
        "name": "Apple MacBook Air M4",
   
    }

   const response = await request.patch(fullpathwithID,{
        data:playload

    })
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.name).toContain(playload.name);
    let objectID = responseBody.id;
})

test('delete API', async ({request})=>{
    

   const response = await request.delete(fullpathwithID)
    let responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.message).toContain('Object with');
    let objectID = responseBody.id;
})