import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image="/1.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 80,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3, // Limit to 3 lines
            }}
          >
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectCard