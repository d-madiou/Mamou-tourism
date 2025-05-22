import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const useFetch = (table, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select('*');

        if (options.orderBy) {
          query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
        }

        const { data: result, error: queryError } = await query;

        if (queryError) throw queryError;

        // Transform data to match the previous Strapi format
        const transformedData = {
          data: result.map(item => ({
            id: item.id,
            ...item
          }))
        };

        setData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, options]);

  return { loading, error, data };
};

export default useFetch;