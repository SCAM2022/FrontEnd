import { useState, useEffect } from "react";
import classes from "./Clubs.module.css";
// import Navbar from '../Navbar/Navbar'
import club from "../../assets/code.jpg";
import { ClubList } from "./ClubList";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

const Clubs = (props) => {
  const [clubs, setClubs] = useState("");

  useEffect(() => {
    const getClubsData = async () => {
      const getClubs = async () => {
        const r = await axios.get(`${process.env.REACT_APP_API_KEY}/findClub`);
        return r;
      };
      getClubs()
        .then((r) => {
          console.log("clubList->", r);
          setClubs(r?.data?.clubs);
        })
        .catch((e) => {
          console.log("getClub err->", e);
        });
    };
    getClubsData();
  }, []);
  console.log("clubsData->", clubs);

  return (
    <div>
      {/* <Navbar /> */}
      <div className={classes.Clubs}>
        <div className={classes.Clubs_heading}>
          <h2 className={classes.heading}>ALL CLUBS HERE</h2>
          <span>
            There is present all awsom club which take you one level up{" "}
          </span>
        </div>
        <div className={classes.Clubs_container}>
          {/* {ClubList.map((list) => {
            const { id, name, img } = list;
            return (
              <div className={classes.club} key={id}>
                <img src={img} alt={name} />
                <h2 className={classes.club_heading}>{name}</h2>
                <Link to="/club" className={classes.club_btn}>
                  View
                </Link>
              </div>
            );
          })} */}
          {clubs &&
            clubs?.map((list) => {
              const { id, name, clubImage, disc } = list;
              return (
                <div className={classes.club} key={id}>
                  <img
                    src={`${process.env.REACT_APP_API_KEY}/${clubImage}`}
                    alt={name}
                  />
                  <h2 className={classes.club_heading}>{name}</h2>
                  <Link to={`/club/${name}`} className={classes.club_btn}>
                    View
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
