export const leaveReview = async (questId: string, rating: string | null, comment: string) => {
  try {
    const response = await fetch('http://localhost:8000/api/leave_review', {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quest_id: questId,
        rating,
        comment,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Не вдалося залишити відгук');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка під час залишення відгуку:', error);
    return null;
  }
};
