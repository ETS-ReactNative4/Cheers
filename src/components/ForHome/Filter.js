import {
    makeStyles,
    TableRow,
    TableHead,
    Table,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

//Styling using Material UI React
const useStyles = makeStyles({
    create: {
        margin: 20,
        background: "#2E8B57",
        width: "86%",
        color: "#FFFFFF",
    },
    table: {
        border: "1px solid rgba(0, 0, 0, 0.5)",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    row: {
        "&:active": {
            background: "#D3D3D3",
            border: "1px"
        },
        "&:hover": {
            transition: "all 0.4s ease 0s",
            background: "#D3D3D3",
            color: "#010606"
        },
        cursor: "pointer"
    }
});

//Filters/tags
const Filter = ({ filters, setPosts, filterPostsFromDatabase, getPostsFromDatabase, createLink }) => {
    const classes = useStyles();
    return (
        <>
            {localStorage.token && (
                <Link to={createLink} className={classes.link}>
                    <Button variant="contained" className={classes.create}>
                        New Post
                    </Button>
                </Link>
            )}

            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.row}>
                        <TableCell onClick={() => allPosts()}>
                            All Posts
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filters.map((c) => (
                        <TableRow className={classes.row}>
                            <TableCell onClick={() => update(c)}>{c}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );

    async function update(filter) {
        //   let filteredPosts = await filterPostsFromDatabase(category);
        //   setPosts(filteredPosts);
    }

    async function allPosts() {
        //   const allPosts = await getPostsFromDatabase();
        //   setPosts(allPosts);
    }
};

export default Filter;
