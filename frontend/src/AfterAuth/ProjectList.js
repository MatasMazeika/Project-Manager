import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import projectImg from '../resources/img/project.jpg';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1300,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


const tileData = [
    {
        img: projectImg,
        title: 'Image',
        author: 'author',
    },
    {
        img: projectImg,
        title: 'Image',
        author: 'author',
    },
];

export default function ProjectList(props) {
    const classes = useStyles();
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:3000/api/projects/allUserProjects', {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            .then((result) => {
                setProjectData(result.data)
            })
            .then(() => {
                setLoading(true)
            })
        }
        fetchData()
    }, [])

    const sendProjectIdData = (e) => {
        props.projectId(e.currentTarget.name)
    }

    return (
        <div className={classes.root}>
            {loading &&
                <GridList cellHeight={180} className={classes.gridList} spacing={15}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">December</ListSubheader>
                    </GridListTile>
                    {projectData.map(project => (
                        <GridListTile key={project._id}>
                            <img src={projectImg} name={project._id} onClick={sendProjectIdData} />
                            <GridListTileBar
                                title={project.projectTitle}
                                subtitle={<span>Short description: {project.description}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${project.projectTitle}`} className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            }
        </div>
    );
}