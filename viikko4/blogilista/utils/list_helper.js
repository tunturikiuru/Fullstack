const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    function callback(accumulator, currentValue) {
        return accumulator + currentValue.likes }
    return blogs.reduce(callback, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find((blog) => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
    let freq = {}
    let most = 0
    let author = null

    for (const blog of blogs) {
        freq[blog.author] = (freq[blog.author] || 0) + 1
        if (freq[blog.author] > most) {
            most = freq[blog.author]
            author = blog.author
        }
    }

    return {author: author, blogs: most}
}

const mostLikes = (blogs) => {
    let freq = {}
    let most = 0
    let author = null

    for (const blog of blogs) {
        freq[blog.author] = (freq[blog.author] || 0) + blog.likes
        if (freq[blog.author] > most) {
            most = freq[blog.author]
            author = blog.author
        }
    }

    return {author: author, likes: most}

}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}