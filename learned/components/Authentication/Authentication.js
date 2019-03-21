import Link from 'next/link'

const Authentication = (props) => {

    let extraInfo;
    if(props.type === "login") {
        extraInfo = <div>
            <p>Don't have an account?</p>
            <Link href="/signup">
                <a>Create account</a>
            </Link>
        </div>
    } else {
        extraInfo = <div>
            <p>Already have an account?</p>
            <Link href="/login">
                <a>Sign in</a>
            </Link>
        </div>
    }

    return (
      <div className="verifyPage">
        <div className="brandingSection">
            <div className="logo"></div>
            <h2>Learned</h2>
            <p>Remember everything important.</p>
        </div>
        <button onClick={function() { props.handleGoogle()}}>Continue with Google</button>
        <button onClick={function() { props.handleSignOut()}}>Sign Out</button>
        <div>
            <span></span>
            <p>or</p>
            <span></span>
        </div>
        <div>
            <input placeholder="Email" className="emailHandler" onChange={function(ev) {
                props.setEmail(ev.target.value)
            }}>
            </input>
            <input placeholder="Password"  className="passwordHandler" onChange={function(ev) {
                props.setPassword(ev.target.value)
            }}>
            </input>
        </div>
        <button onClick={props.submitInfo}>Continue</button>
        {extraInfo}
      </div>
    )
  }
  
export default Authentication;