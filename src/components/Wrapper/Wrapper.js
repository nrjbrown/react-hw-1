import React, { Component } from "react";
import CharacterCard from "../CharacterCard";
import images from "../../characters.json";
import "./Wrapper.css";

class Wrapper extends Component {
  state = {
    images,
    message: "Click one of the Characters to begin!",
    score: 0,
    topScore: 0
  };

  handleClick = (id, clicked) => {
    const imageOrder = this.state.images;

    if (clicked) {
      imageOrder.forEach((image, index) => {
        imageOrder[index].clicked = false;
      });
      return this.setState({
        // randomize click event
        image: imageOrder.sort(() => Math.random() - 0.5),
        message: "You Guessed Incorrectly!",
        score: 0
      });
    } else {
      imageOrder.forEach((image, index) => {
        if (id === image.id) {
          imageOrder[index].clicked = true;
        }
      });

      const { topScore, score } = this.state;
      const newScore = score + 1;
      // ternary operator
      const newTopScore = newScore > topScore ? newScore : topScore;

      return this.setState({
        // randomize click event
        image: imageOrder.sort(() => Math.random() - 0.5),
        message: "You Guessed Correctly!",
        score: newScore,
        topScore: newTopScore
      });
    }
  };

  render() {
    return (
      <div className="container-fluid mainCardContainer">
        <div className="gameMessage text-center">
          <p>{this.state.message}</p>
        </div>
        <div className="gameScores text-center">
          <p>
            Score: {this.state.score} | Top Score: {this.state.topScore}
          </p>
        </div>
        <div className="container">
          <div className="row">
            {this.state.images.map(image => (
              <CharacterCard
                key={image.id}
                id={image.id}
                name={image.name}
                clicked={image.clicked}
                image={image.image}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Wrapper;
