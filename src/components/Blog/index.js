import React, { useState } from "react";
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  Heart,
  MessageCircle,
  Search,
  Filter,
  TrendingUp,
  Eye,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { blogPostsData } from "./blogData";
import "./index.scss";

function Blog(props) {
  props.myFun(false);
  props.myFun2(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPostsData);

  const categories = React.useMemo(() => {
    const uniqueCategories = new Set();
    blogPostsData.forEach(post => {
      if (post.category && typeof post.category === 'string') {
        uniqueCategories.add(post.category);
      }
    });
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const categoryColors = Object.freeze({
    Fashion: "from-pink-500 to-rose-500",
    Beauty: "from-purple-500 to-pink-500", 
    Technology: "from-blue-500 to-cyan-500",
    Lifestyle: "from-green-500 to-emerald-500",
  });

  const categoryBadgeColors = Object.freeze({
    Fashion: "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200",
    Beauty: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200",
    Technology: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200",
    Lifestyle: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
  });

  // Filter posts based on search and category
  React.useEffect(() => {
    let filtered = [...blogPostsData];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.tags && Array.isArray(post.tags) && post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const getTrendingPosts = () => {
    return [...blogPostsData]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
  };

  // Safe category color getter
  const getCategoryColor = (category, colorType = 'badge') => {
    const colors = colorType === 'badge' ? categoryBadgeColors : categoryColors;
    return colors[category] || (colorType === 'badge' 
      ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200" 
      : "from-gray-500 to-gray-600"
    );
  };

  return (
    <div className="blog-container">
      {/* Animated Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
            <div className="floating-circle circle-4"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>Discover Amazing Stories</span>
          </div>
          
          <h1 className="hero-title">
            Where Ideas Come to
            <span className="hero-title-highlight"> Life</span>
          </h1>
          
          <p className="hero-description">
            Explore our curated collection of insightful articles, cutting-edge trends, 
            and expert opinions across fashion, beauty, technology, and lifestyle.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <BookOpen className="w-5 h-5" />
              <span>{blogPostsData.length}+ Articles</span>
            </div>
            <div className="stat-item">
              <User className="w-5 h-5" />
              <span>Expert Writers</span>
            </div>
            <div className="stat-item">
              <TrendingUp className="w-5 h-5" />
              <span>Weekly Updates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-main-content">
        {/* Enhanced Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-filter-container">
            <div className="search-section">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for articles, topics, or inspiration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="clear-search-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="filter-section">
             
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`category-btn ${
                      selectedCategory === category ? 'active' : ''
                    } ${category.toLowerCase()}`}
                  >
                    {category}
                    {selectedCategory === category && (
                      <div className="category-btn-glow"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="results-summary">
              {filteredPosts.length === 0 ? (
                <div className="no-results">
                  <span className="no-results-text">No articles found matching your criteria.</span>
                </div>
              ) : (
                <div className="results-count">
                  <span className="results-number">{filteredPosts.length}</span>
                  <span className="results-text">
                    {filteredPosts.length === 1 ? ' article found' : ' articles found'}
                  </span>
                  {searchTerm && <span className="search-term">for "{searchTerm}"</span>}
                  {selectedCategory !== "All" && <span className="category-term">in {selectedCategory}</span>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Featured Article */}
        {filteredPosts.length > 0 && (
          <div className="featured-section">
            <div className="section-header">
              <h2 className="section-title">
                <Sparkles className="w-6 h-6" />
                Featured Article
              </h2>
              <div className="section-line"></div>
            </div>
            
            <div className="featured-article">
              <Link to={`/blog/${filteredPosts[0].slug}`} className="featured-link">
                <div className="featured-card">
                  <div className="featured-image-container">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="featured-image"
                    />
                    <div className="featured-overlay"></div>
                    
                    <div className="featured-badges">
                      <span className="featured-badge">Featured</span>
                      <span className={`category-badge ${getCategoryColor(filteredPosts[0].category)}`}>
                        {filteredPosts[0].category}
                      </span>
                    </div>
                    
                    <div className="featured-stats">
                      <div className="stat">
                        <Eye className="w-4 h-4" />
                        <span>{filteredPosts[0].views?.toLocaleString()}</span>
                      </div>
                      <div className="stat">
                        <Heart className="w-4 h-4" />
                        <span>{filteredPosts[0].likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="featured-content">
                    <div className="featured-meta">
                      <div className="meta-item">
                        <Calendar className="w-4 h-4" />
                        <span>{filteredPosts[0].date}</span>
                      </div>
                      <div className="meta-item">
                        <User className="w-4 h-4" />
                        <span>{filteredPosts[0].author}</span>
                      </div>
                      <div className="meta-item">
                        <Clock className="w-4 h-4" />
                        <span>{filteredPosts[0].readTime}</span>
                      </div>
                    </div>

                    <h3 className="featured-title">
                      {filteredPosts[0].title}
                    </h3>
                    
                    <p className="featured-excerpt">
                      {filteredPosts[0].excerpt}
                    </p>

                    <div className="featured-footer">
                      <div className="featured-tags">
                        {filteredPosts[0].tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="featured-tag">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="read-more-btn">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Enhanced Articles Grid */}
        {filteredPosts.length > 1 && (
          <div className="articles-section">
            <div className="section-header">
              <h2 className="section-title">
                <BookOpen className="w-6 h-6" />
                Latest Articles
              </h2>
              <div className="section-line"></div>
            </div>
            
            <div className="articles-grid">
              {filteredPosts.slice(1).map((post, index) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="article-link">
                  <article className="article-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="article-image-container">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="article-image"
                      />
                      <div className="article-overlay"></div>
                      
                      <div className="article-category">
                        <span className={`category-badge ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                      
                      <div className="article-stats">
                        <div className="stat">
                          <Eye className="w-3 h-3" />
                          <span>{post.views?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="article-content">
                      <div className="article-meta">
                        <div className="meta-item">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <span className="meta-divider">•</span>
                        <div className="meta-item">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="article-title">
                        {post.title}
                      </h3>
                      
                      <p className="article-excerpt">
                        {post.excerpt}
                      </p>

                      <div className="article-footer">
                        <div className="author-info">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="author-avatar"
                          />
                          <span className="author-name">{post.author}</span>
                        </div>

                        <div className="article-engagement">
                          <div className="engagement-item">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="engagement-item">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {filteredPosts.length === 0 && (
          <div className="no-results-section">
            <div className="no-results-container">
              <div className="no-results-icon">
                <Search className="w-16 h-16" />
                <div className="search-animation"></div>
              </div>
              <h3 className="no-results-title">No Articles Found</h3>
              <p className="no-results-description">
                We couldn't find any articles matching your search criteria. 
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="clear-filters-btn"
              >
                <Filter className="w-4 h-4" />
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Trending Section */}
        <div className="trending-section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp className="w-6 h-6" />
              Trending Now
            </h2>
            <div className="section-line"></div>
          </div>
          
          <div className="trending-grid">
            {getTrendingPosts().map((post, index) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="trending-link">
                <div className="trending-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="trending-rank">
                    <span className="rank-number">#{index + 1}</span>
                    <div className="rank-glow"></div>
                  </div>
                  
                  <div className="trending-content">
                    <h4 className="trending-title">
                      {post.title}
                    </h4>
                    
                    <div className="trending-meta">
                      <div className="meta-item">
                        <Eye className="w-3 h-3" />
                        <span>{post.views?.toLocaleString()} views</span>
                      </div>
                      <span className="meta-divider">•</span>
                      <div className="meta-item">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="trending-arrow">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;