import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://fxvutobtyimqvbmijzxk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dnV0b2J0eWltcXZibWlqenhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTIxNzQsImV4cCI6MjA5MzI4ODE3NH0.dc4xIy_aFuFx53x-mQkuCTDZkeNXGfvxYGUobdSqSKk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
