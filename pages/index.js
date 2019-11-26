import { withApollo } from "../apollo/client"
import gql from "graphql-tag"
import Link from "next/link"
import { useQuery } from "@apollo/react-hooks"

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
        }
    }
`

const Index = () => {
    const { data: { viewer } } = useQuery(ViewerQuery)
    const { data: { thetime } } = useQuery(TimeQuery)

    if (viewer && thetime) {
        return (
            <div>
                You're signed in as {viewer.name} at {thetime.dateString} and
                you're {viewer.status} goto{" "}
                <Link href="/about">
                    <a>static</a>
                </Link>{" "}
                page.
            </div>
        )
    }

    return null
}

export default withApollo(Index)
