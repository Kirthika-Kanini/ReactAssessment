import React from 'react'

function NewsLetter() {
  return (
    <div>
      <section className="newsletter">
        <div className="newstext">
          <h2>Newsletter</h2>
          <p>Subscribe to get offers and latest<br />updates every week!</p>
        </div>

        <div className="send">
          <form action="">
            <input type="email" name="emailid" placeholder="E-mail" required />
            <input type="submit" value="Subscribe" />
          </form>
        </div>
      </section>
    </div>
  )
}

export default NewsLetter
