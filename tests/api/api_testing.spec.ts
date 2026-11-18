import { test, expect } from '../fixtures';

 const BASE_URL = 'https://dev.emeli.in.ua/wp-json/wp/v2';
 const POSTS_ENDPOINT = `${BASE_URL}/posts`;

 
const AUTH = {

   username: 'admin',
   password: 'Engineer_123'

 };

 
const getAuthHeaders = () => ({

   'Authorization': `Basic ${Buffer.from(`${AUTH.username}:${AUTH.password}`).toString('base64')}`,
   'Content-Type': 'application/json'

 });

 