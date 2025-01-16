import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useQnaResponses = () => {
  const [averageResponses, setAverageResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user:userId}=useSelector((state)=>state.user)


  const fetchAverageResponses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/updateQna`,{id:userId});
      setAverageResponses(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch average responses');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateResponse = useCallback(
    async (quesId, response) => {
      setLoading(true);
      setError(null);

      try {
        const payload = { id: userId, quesId, response };
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/updateQna`, payload);
        setAverageResponses(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update response');
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchAverageResponses();
  }, [fetchAverageResponses]);

  return { averageResponses, updateResponse, fetchAverageResponses, loading, error };
};

export default useQnaResponses;
