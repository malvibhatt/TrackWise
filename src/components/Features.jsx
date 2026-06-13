import './Features.css'

const features = [
  {
    icon: '📊',
    title: 'Know Where Your Money Goes',
    description: 'Log every expense and income with categories. See a clear monthly breakdown — groceries, rent, dining — so nothing is a mystery.',
  },
  {
    icon: '🏠',
    title: 'Shared Household View',
    description: 'Two people, one dashboard. Both partners log their own spending, and TrackWise combines it into a single household picture.',
  },
  {
    icon: '🎯',
    title: 'Budget Before You Overspend',
    description: 'Set a monthly budget per category. Get real-time alerts like "Dining: 80% used" so you can course-correct before month end.',
  },
  {
    icon: '💰',
    title: 'Track Savings Goals',
    description: 'Saving for a vacation or emergency fund? Create a goal, add contributions, and watch the progress bar grow.',
  },
  {
    icon: '🔄',
    title: 'Never Miss a Subscription',
    description: 'Set up recurring entries once. TrackWise auto-logs them and shows you every subscription and its monthly total in one place.',
  },
  {
    icon: '📈',
    title: 'See the Trend Over Time',
    description: 'Month-over-month charts show income vs. expenses and spending trends — so you know if things are improving or slipping.',
  },
]

export default function Features() {
  return (
    <section className="features" id="about">
      <div className="features-inner">
        <div className="section-label">About the Product</div>
        <h2>Everything you need to manage money <span className="text-green">together</span></h2>
        <p className="section-sub">
          Real problems, real solutions — built for households who want clarity without complexity.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
