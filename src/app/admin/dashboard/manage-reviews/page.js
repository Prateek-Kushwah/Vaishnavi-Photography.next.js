'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { reviewService } from '@/lib/reviewService';

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    category: '',
    email: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewService.getReviews();
      console.log('Fetched reviews data:', data);
      
      if (!Array.isArray(data)) {
        console.error('Invalid reviews data:', data);
        setReviews([]);
        return;
      }

      // Sort by creation date (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.createdAt || b.bookedAt) - new Date(a.createdAt || a.bookedAt)
      );
      setReviews(sorted);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.name || !newReview.content || !newReview.rating) {
      alert('Please fill in required fields');
      return;
    }

    try {
      await reviewService.submitReview({
        ...newReview,
        createdAt: new Date().toISOString()
      });

      // Reset form and refresh
      setNewReview({
        name: '',
        role: '',
        content: '',
        rating: 5,
        category: '',
        email: '',
        status: 'pending'
      });
      setShowAddForm(false);
      fetchReviews();
      
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    
    if (!editingReview.name || !editingReview.content || !editingReview.rating) {
      alert('Please fill in required fields');
      return;
    }

    try {
      await reviewService.updateReview(editingReview.id, editingReview);
      setEditingReview(null);
      fetchReviews();
      alert('Review updated successfully!');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
    }
  };

  const updateReviewStatus = async (id, newStatus) => {
    try {
      await reviewService.updateReview(id, { status: newStatus });
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, status: newStatus } : review
      ));
      alert(`Review ${newStatus} successfully!`);
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
    }
  };

  const deleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await reviewService.deleteReview(id);
      setReviews(reviews.filter(review => review.id !== id));
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const startEditing = (review) => {
    setEditingReview({ ...review });
  };

  const cancelEditing = () => {
    setEditingReview(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: styles.statusPending,
      approved: styles.statusApproved,
      rejected: styles.statusCancelled
    };
    
    const className = `${styles.statusBadge} ${statusClasses[status] || styles.statusPending}`;
    
    return (
      <span className={className}>
        {status === 'pending' ? 'Pending' : 
         status === 'approved' ? 'Approved' : 
         status === 'rejected' ? 'Rejected' : 'Pending'}
      </span>
    );
  };

  const renderStars = (rating) => {
    return (
      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`${styles.star} ${i < rating ? styles.starFilled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const pendingReviews = reviews.filter(review => review.status === 'pending');
  const approvedReviews = reviews.filter(review => review.status === 'approved');

  return (
    <div className={styles.manageReviews}>
      <div className={styles.header}>
        <h1>Manage Reviews</h1>
        <p>Approve, edit, and manage all testimonials. New reviews are created with status: Pending.</p>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={styles.addButton}
        >
          {showAddForm ? 'Cancel' : 'Add New Review'}
        </button>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <div className={styles.addForm}>
          <h2>Add New Review</h2>
          <form onSubmit={handleAddReview}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  required
                  className={styles.input}
                  placeholder="Enter reviewer name"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <input
                  type="text"
                  value={newReview.role}
                  onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                  className={styles.input}
                  placeholder="e.g., Wedding Client, Portrait Session"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={newReview.email}
                  onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                  className={styles.input}
                  placeholder="Enter reviewer email"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={newReview.category}
                  onChange={(e) => setNewReview({...newReview, category: e.target.value})}
                  className={styles.input}
                >
                  <option value="">Select Category</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Family">Family</option>
                  <option value="Event">Event</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Rating *</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  required
                  className={styles.input}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div className={styles.formGroupFull}>
                <label>Review Content *</label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  className={styles.input}
                  placeholder="Enter the review content"
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Add Review (Status: Pending)
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Review</h2>
            <form onSubmit={handleUpdateReview}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Name *</label>
                  <input
                    type="text"
                    value={editingReview.name}
                    onChange={(e) => setEditingReview({...editingReview, name: e.target.value})}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role</label>
                  <input
                    type="text"
                    value={editingReview.role || ''}
                    onChange={(e) => setEditingReview({...editingReview, role: e.target.value})}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={editingReview.email || ''}
                    onChange={(e) => setEditingReview({...editingReview, email: e.target.value})}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={editingReview.category || ''}
                    onChange={(e) => setEditingReview({...editingReview, category: e.target.value})}
                    className={styles.input}
                  >
                    <option value="">Select Category</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Family">Family</option>
                    <option value="Event">Event</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Rating *</label>
                  <select
                    value={editingReview.rating}
                    onChange={(e) => setEditingReview({...editingReview, rating: parseInt(e.target.value)})}
                    required
                    className={styles.input}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select
                    value={editingReview.status}
                    onChange={(e) => setEditingReview({...editingReview, status: e.target.value})}
                    className={styles.input}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className={styles.formGroupFull}>
                  <label>Review Content *</label>
                  <textarea
                    value={editingReview.content}
                    onChange={(e) => setEditingReview({...editingReview, content: e.target.value})}
                    className={styles.input}
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  Update Review
                </button>
                <button 
                  type="button" 
                  onClick={cancelEditing}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className={styles.reviewsContainer}>
        {/* Pending Reviews */}
        <div className={styles.reviewsSection}>
          <h2>Pending Reviews ({pendingReviews.length})</h2>
          
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading reviews...</p>
            </div>
          ) : pendingReviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p>No pending reviews</p>
            </div>
          ) : (
            <div className={styles.reviewsGrid}>
              {pendingReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  onUpdateStatus={updateReviewStatus}
                  onEdit={startEditing}
                  onDelete={deleteReview}
                  renderStars={renderStars}
                  getStatusBadge={getStatusBadge}
                  showApprove={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Approved Reviews */}
        <div className={styles.reviewsSection}>
          <h2>Approved Reviews ({approvedReviews.length})</h2>
          
          {approvedReviews.length === 0 ? (
            <div className={styles.noReviews}>
              <p>No approved reviews</p>
            </div>
          ) : (
            <div className={styles.reviewsGrid}>
              {approvedReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  onUpdateStatus={updateReviewStatus}
                  onEdit={startEditing}
                  onDelete={deleteReview}
                  renderStars={renderStars}
                  getStatusBadge={getStatusBadge}
                  showApprove={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, onUpdateStatus, onEdit, onDelete, renderStars, getStatusBadge, showApprove }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewerInfo}>
          <h3>{review.name}</h3>
          {review.role && <span className={styles.reviewerRole}>{review.role}</span>}
        </div>
        {getStatusBadge(review.status)}
      </div>
      
      <div className={styles.reviewContent}>
        {renderStars(review.rating)}
        <p className={styles.reviewText}>"{review.content}"</p>
      </div>
      
      <div className={styles.reviewDetails}>
        {review.category && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Category:</span>
            <span className={styles.detailValue}>{review.category}</span>
          </div>
        )}
        
        {review.email && (
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email:</span>
            <span className={styles.detailValue}>{review.email}</span>
          </div>
        )}
        
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Created:</span>
          <span className={styles.detailValue}>
            {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 
             review.bookedAt ? new Date(review.bookedAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>

      <div className={styles.reviewActions}>
        {showApprove && (
          <button
            onClick={() => onUpdateStatus(review.id, 'approved')}
            className={styles.approveButton}
          >
            Approve
          </button>
        )}
        
        {!showApprove && review.status !== 'rejected' && (
          <button
            onClick={() => onUpdateStatus(review.id, 'pending')}
            className={styles.pendingButton}
          >
            Mark Pending
          </button>
        )}
        
        {review.status !== 'rejected' && (
          <button
            onClick={() => onUpdateStatus(review.id, 'rejected')}
            className={styles.rejectButton}
          >
            Reject
          </button>
        )}
        
        <button
          onClick={() => onEdit(review)}
          className={styles.editButton}
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(review.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
}