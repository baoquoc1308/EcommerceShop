import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Eye,
  Bookmark,
  Home,
  ChevronRight,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { blogPostsData } from "../Blog/blogData";
import "./index.scss";

function BlogPost(props) {
  props.myFun(false);
  props.myFun2(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  useEffect(() => {
    const foundPost = blogPostsData.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      setLikes(foundPost.likes);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector(".blog-content");
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        setReadingProgress(Math.min(Math.max(scrollPercentRounded, 0), 100));
      }
    };

    window.addEventListener("scroll", updateReadingProgress);
    updateReadingProgress();
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, [post]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
      default:
        break
    }
    setShowShareMenu(false);
  };

  const generateTableOfContents = () => {
    if (!post?.content?.sections) return [];
    return post.content.sections.map((section, index) => ({
      id: section.id,
      title: section.title,
      level: 1,
    }));
  };

  const relatedPosts = blogPostsData
    .filter((p) => p.id !== post?.id && p.category === post?.category)
    .slice(0, 3);

  const categoryColors = {
    Fashion: "bg-pink-100 text-pink-800 border-pink-200",
    Beauty: "bg-purple-100 text-purple-800 border-purple-200",
    Technology: "bg-blue-100 text-blue-800 border-blue-200",
    Lifestyle: "bg-green-100 text-green-800 border-green-200",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <div className="space-y-3">
            <Link
              to="/blog"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <div className="text-center">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tableOfContents = generateTableOfContents();

  return (
    <div className="blog-post-container min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-20">
      
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3 hidden lg:block">
        <button
          onClick={handleLike}
          className={`p-3 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${
            isLiked
              ? "bg-red-500 text-white border-red-500"
              : "bg-white/90 text-gray-600 border-gray-200 hover:bg-red-50 hover:text-red-500"
          }`}
          title={isLiked ? "Unlike" : "Like"}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={handleBookmark}
          className={`p-3 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${
            isBookmarked
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-white/90 text-gray-600 border-gray-200 hover:bg-yellow-50 hover:text-yellow-500"
          }`}
          title={isBookmarked ? "Remove bookmark" : "Bookmark"}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
          />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-3 rounded-full shadow-lg backdrop-blur-sm border bg-white/90 text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300"
            title="Share article"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {showShareMenu && (
            <div className="absolute right-full mr-3 top-0 bg-white rounded-lg shadow-xl border p-2 space-y-2 min-w-[140px]">
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center w-full p-2 text-left hover:bg-blue-50 rounded transition-colors text-sm"
              >
                <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                Twitter
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center w-full p-2 text-left hover:bg-blue-50 rounded transition-colors text-sm"
              >
                <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                Facebook
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center w-full p-2 text-left hover:bg-blue-50 rounded transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center w-full p-2 text-left hover:bg-green-50 rounded transition-colors text-sm"
              >
                {copySuccess ? (
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2 text-gray-600" />
                )}
                {copySuccess ? "Copied!" : "Copy Link"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        
        <div className="flex items-center text-sm text-gray-600 mb-8 space-x-2">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to="/blog"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">{post.category}</span>
        </div>

        
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Blog</span>
          </button>

          
          <button
            onClick={() => setShowTableOfContents(!showTableOfContents)}
            className="lg:hidden flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            {showTableOfContents ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            <span className="ml-2">Contents</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              
              <div className="relative h-64 md:h-96">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute top-6 left-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${
                      categoryColors[post.category]
                    }`}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-lg text-white/90 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              
              <div className="p-6 md:p-8 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {post.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        {post.authorBio}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.views.toLocaleString()} views
                  </div>
                </div>

                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-colors duration-300 ${
                      isLiked
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span>{likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </div>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              
              <div className="p-6 md:p-8">
                <div className="blog-content prose prose-lg max-w-none">
                  
                  {post.content.introduction && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                      <p className="text-lg leading-relaxed text-gray-700 mb-0 font-medium">
                        {post.content.introduction}
                      </p>
                    </div>
                  )}

                  
                  {post.content.sections?.map((section, index) => (
                    <div key={section.id} id={section.id} className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                        {section.title}
                      </h2>
                      <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: section.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\*(.*?)\*/g, "<em>$1</em>")
                            .replace(/\n\n/g, "</p><p>")
                            .replace(/^/, "<p>")
                            .replace(/$/, "</p>")
                            .replace(/<p><\/p>/g, ""),
                        }}
                      />
                    </div>
                  ))}

                  
                  {post.content.conclusion && (
                    <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                      <h3 className="text-xl font-bold text-green-800 mb-4">
                        Conclusion
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-0">
                        {post.content.conclusion}
                      </p>
                    </div>
                  )}

                  
                  {post.content.actionItems && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500">
                      <h3 className="text-xl font-bold text-yellow-800 mb-4">
                        Key Takeaways
                      </h3>
                      <ul className="space-y-2 mb-0">
                        {post.content.actionItems.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>

          
          <div
            className={`lg:col-span-1 space-y-6 ${
              showTableOfContents ? "block" : "hidden lg:block"
            }`}
          >
            
            {tableOfContents.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Menu className="w-5 h-5 mr-2" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-2 border-l-2 border-transparent hover:border-blue-500 pl-3"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        setShowTableOfContents(false);
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-semibold text-gray-800 mb-2">
                  {post.author}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{post.authorBio}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Follow Author
                </button>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-lg p-6 lg:hidden">
              <h3 className="font-semibold text-gray-800 mb-4">
                Share this article
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center justify-center p-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center justify-center p-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        
        {relatedPosts.length > 0 && (
          <section className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[relatedPost.category]
                        }`}
                      >
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedPost.readTime}</span>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-3 h-3" />
                        <span>{relatedPost.likes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
