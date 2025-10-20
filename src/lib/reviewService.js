const API_URL = '/api/testimonial';

export const reviewService = {
  async submitReview(reviewData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) throw new Error('Failed to submit review');
      return await response.json();
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  },

  async getReviews() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch reviews');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  async updateReview(reviewId, updates) {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewId: reviewId,
          updates: updates
        })
      });

      if (!response.ok) throw new Error('Failed to update review');
      return await response.json();
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  },

  async deleteReview(reviewId) {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: reviewId })
      });

      if (!response.ok) throw new Error('Failed to delete review');
      return await response.json();
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  },

  async getApprovedReviews() {
    try {
      const reviews = await this.getReviews();
      return reviews.filter(review => review.status === 'approved');
    } catch (error) {
      console.error('Error fetching approved reviews:', error);
      throw error;
    }
  },

  async getPendingReviews() {
    try {
      const reviews = await this.getReviews();
      return reviews.filter(review => review.status === 'pending');
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      throw error;
    }
  },

  async getReviewsCount() {
    try {
      const reviews = await this.getReviews();
      return {
        total: reviews.length,
        approved: reviews.filter(r => r.status === 'approved').length,
        pending: reviews.filter(r => r.status === 'pending').length
      };
    } catch (error) {
      console.error('Error getting reviews count:', error);
      throw error;
    }
  }
};