import Hero from "../sections/Hero"
import WhoWeServe from "../sections/WhoWeServe"
import CTA from "../sections/CTA"

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen" >
            <Hero />
            <WhoWeServe />
            <CTA />
        </div>
    )
}

export default Home;