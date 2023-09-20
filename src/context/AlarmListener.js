import { useEffect } from 'react';

const AlarmListener = ({ endpoint }) => {
  useEffect(() => {
    const eventSource = new EventSource(endpoint);

    eventSource.onmessage = (event) => {
      // Handle the received SSE event
      const data = JSON.parse(event.data);
      console.log('Received SSE event:', data);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };

    return () => {
      // Clean up the event source when the component unmounts
      eventSource.close();
    };
  }, [endpoint]);

  return null;
};

export default AlarmListener;
