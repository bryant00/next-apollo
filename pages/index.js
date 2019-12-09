import { withApollo } from "../apollo/client"
import { Component } from "react"
import gql from "graphql-tag"
import Link from "next/link"
import { useQuery } from "@apollo/react-hooks"
import "semantic-ui-css/semantic.min.css"
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from "semantic-ui-react"
import PropTypes from "prop-types"
import SmallImage from "./SmallImage.png"
import LargeImage from "./tesla.png"
import "./styles.css"

const ViewerQuery = gql`
    query ViewerQuery {
        viewer {
            id
            name
            status
        }
    }
`

const TimeQuery = gql`
    query TimeQuery {
        thetime {
            date
            month
            year
            dateString
            timeString
        }
    }
`

const Index2 = () => {
    const { data: { viewer } } = useQuery(ViewerQuery)
    const { data: { thetime } } = useQuery(TimeQuery)

    if (viewer && thetime) {
        return (
            <div>
                You&apos;re signed in as {viewer.name} on {thetime.dateString}
                at {thetime.timeString} and you&apos;re {viewer.status} go to{" "}
                <Link href="/about">
                    <a>static</a>
                </Link>{" "}
                page.
            </div>
        )
    }

    return null
}

const getWidth = () => {
    const isSSR = typeof window === "undefined"

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) =>
    <Container text>
        <Header
            as="h1"
            style={{
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: mobile ? "1.5em" : "3em",
            }}
        >
            <Image
                src={LargeImage}
                circular
                style={{ height: 200, width: 200 }}
            />
        </Header>
        <Header
            as="h2"
            content="BRYANT PATTON"
            inverted
            style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em",
            }}
        />
        <Header
            as="h4"
            content="Web developer"
            inverted
            style={{
                fontSize: mobile ? "1em" : "1.2em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1em",
            }}
        />
    </Container>

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}
            >
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ minHeight: 700, padding: "1em 0em" }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? "top" : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size="large"
                        >
                            <Container>
                                <Menu.Item as="a" active>
                                    Home
                                </Menu.Item>
                                <Menu.Item as="a" href="#about">
                                    About
                                </Menu.Item>
                                <Menu.Item as="a">Portfolio</Menu.Item>
                                <Menu.Item as="a">Contact</Menu.Item>
                                <Menu.Item position="right">
                                    <Button as="a" inverted={!fixed}>
                                        LinkedIn
                                    </Button>
                                    <Button
                                        as="a"
                                        inverted={!fixed}
                                        primary={fixed}
                                        style={{ marginLeft: "0.5em" }}
                                    >
                                        Github
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation="push"
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as="a" active>
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">Work</Menu.Item>
                    <Menu.Item as="a">Company</Menu.Item>
                    <Menu.Item as="a">Careers</Menu.Item>
                    <Menu.Item as="a">Log in</Menu.Item>
                    <Menu.Item as="a">Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign="center"
                        style={{ minHeight: 350, padding: "1em 0em" }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size="large">
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name="sidebar" />
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Button as="a" inverted>
                                        Log in
                                    </Button>
                                    <Button
                                        as="a"
                                        inverted
                                        style={{ marginLeft: "0.5em" }}
                                    >
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) =>
    <div>
        <DesktopContainer>
            {children}
        </DesktopContainer>
        <MobileContainer>
            {children}
        </MobileContainer>
    </div>

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const HomepageLayout = () =>
    <ResponsiveContainer>
        <Segment style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle" id="about">
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as="h3" style={{ fontSize: "2em" }}>
                            About Me
                        </Header>
                        <p style={{ fontSize: "1.33em" }}>
                            Hi! My name is Bryant Patton. I am a Web Developer,
                            and I'm very passionate and dedicated to my work.
                            With 20 years experience as a professional Web
                            developer, I have acquired the skills and knowledge
                            necessary to make your project a success. I enjoy
                            every step of the design process, from discussion
                            and collaboration.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated="right" width={6}>
                        <Image bordered rounded size="large" src={SmallImage} />
                        <Button size="huge">Download CV</Button>
                        <Button size="huge">Send Message</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment style={{ padding: "0em" }} vertical>
            <Grid celled="internally" columns="equal" stackable>
                <Grid.Row textAlign="center">
                    <Grid.Column
                        style={{ paddingBottom: "5em", paddingTop: "5em" }}
                    >
                        <Header as="h3" style={{ fontSize: "2em" }}>
                            "What a Company"
                        </Header>
                        <p style={{ fontSize: "1.33em" }}>
                            That is what they all say about us
                        </p>
                    </Grid.Column>
                    <Grid.Column
                        style={{ paddingBottom: "5em", paddingTop: "5em" }}
                    >
                        <Header as="h3" style={{ fontSize: "2em" }}>
                            "I shouldn't have gone with their competitor."
                        </Header>
                        <p style={{ fontSize: "1.33em" }}>
                            <Image avatar src="/images/avatar/large/nan.jpg" />
                            <b>Nan</b> Chief Fun Officer Acme Toys
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment style={{ padding: "8em 0em" }} vertical>
            <Container text>
                <Header as="h3" style={{ fontSize: "2em" }}>
                    Breaking The Grid, Grabs Your Attention
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                    Instead of focusing on content creation and hard work, we
                    have learned how to master the art of doing nothing by
                    providing massive amounts of whitespace and generic content
                    that can seem massive, monolithic and worth your attention.
                </p>
                <Button as="a" size="large">
                    Read More
                </Button>
                <Divider
                    as="h4"
                    className="header"
                    horizontal
                    style={{ margin: "3em 0em", textTransform: "uppercase" }}
                >
                    <a href="#">Case Studies</a>
                </Divider>
                <Header as="h3" style={{ fontSize: "2em" }}>
                    Did We Tell You About Our Bananas?
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                    Yes I know you probably disregarded the earlier boasts as
                    non-sequitur filler content, but it's really true. It took
                    years of gene splicing and combinatory DNA research, but our
                    bananas can really dance.
                </p>
                <Button as="a" size="large">
                    I'm Still Quite Interested
                </Button>
            </Container>
        </Segment>
        <Segment inverted vertical style={{ padding: "5em 0em" }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as="h4" content="About" />
                            <List link inverted>
                                <List.Item as="a">Sitemap</List.Item>
                                <List.Item as="a">Contact Us</List.Item>
                                <List.Item as="a">
                                    Religious Ceremonies
                                </List.Item>
                                <List.Item as="a">Gazebo Plans</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as="h4" content="Services" />
                            <List link inverted>
                                <List.Item as="a">Banana Pre-Order</List.Item>
                                <List.Item as="a">DNA FAQ</List.Item>
                                <List.Item as="a">How To Access</List.Item>
                                <List.Item as="a">Favorite X-Men</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as="h4" inverted>
                                Footer Header
                            </Header>
                            <p>
                                Extra space for a call to action inside the
                                footer that could help re-engage users.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </ResponsiveContainer>

export default withApollo(HomepageLayout)
