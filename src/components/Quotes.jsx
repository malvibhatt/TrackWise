import './Quotes.css'

const quotes = [
  {
    text: "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
    role: "Investor & Philanthropist",
  },
  {
    text: "Financial freedom is available to those who learn about it and work for it.",
    author: "Robert Kiyosaki",
    role: "Author, Rich Dad Poor Dad",
  },
  {
    text: "A budget is telling your money where to go instead of wondering where it went.",
    author: "Dave Ramsey",
    role: "Personal Finance Author",
  },
  {
    text: "The secret to wealth is simple: find a way to do more for others than anyone else does.",
    author: "Tony Robbins",
    role: "Author & Life Coach",
  },
  {
    text: "It's not about how much money you make, but how much money you keep.",
    author: "Robert Kiyosaki",
    role: "Author, Rich Dad Poor Dad",
  },
  {
    text: "Wealth is not about having a lot of money; it's about having a lot of options.",
    author: "Chris Rock",
    role: "Comedian & Actor",
  },
]

export default function Quotes() {
  return (
    <section className="quotes">
      <div className="quotes-inner">
        <div className="section-label-dark">Motivation</div>
        <h2>Words that inspire <span className="text-green">financial clarity</span></h2>
        <p className="section-sub-dark">
          Great minds on why tracking and intentional spending changes everything.
        </p>
        <div className="quotes-grid">
          {quotes.map((q, i) => (
            <div className="quote-card" key={i}>
              <div className="quote-mark">"</div>
              <p className="quote-text">{q.text}</p>
              <div className="quote-author">
                <div className="author-avatar">{q.author[0]}</div>
                <div>
                  <strong>{q.author}</strong>
                  <span>{q.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
