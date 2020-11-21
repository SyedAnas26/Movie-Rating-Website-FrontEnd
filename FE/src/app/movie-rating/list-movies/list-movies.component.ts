import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})

export class ListMoviesComponent implements OnInit {

  constructor(private service: SharedService) { }


  MovieList: any = [];
  MovieTitleFilter = '';
  MovieListWithoutFilter: any = [];

   // MovieRatingList = this.MovieListWithoutFilter.concat(this.RatingList);

  ngOnInit(): void {
    this.refreshList();
  }


  // tslint:disable-next-line:typedef
  getFormat(date){
    return moment(date).format('LL');
  }


  UpVote(item){
   const upvotes = parseInt(item.UpVotes) + 1;
   const val = {MovieId: item.MovieId,
    UpVotes: upvotes
   };
   this.service.upvote(val).subscribe(res => {
      console.log(res.toString());
      this.refreshList();
    });
  }

  DownVote(item){
  const downvotes = parseInt(item.DownVotes) + 1;
  const val = {MovieId: item.MovieId,
    DownVotes: downvotes
   };
  this.service.downvote(val).subscribe(res => {
    console.log(res.toString());
    this.refreshList();
  });

  }

  refreshList(){
    this.service.getMovieList().subscribe(data => {
      this.MovieList = data;
      this.MovieListWithoutFilter = data;
      this.sortResult('ReleaseDate', false);
    });
  }

  FilterFn(){
    const MovieTitleFilter = this.MovieTitleFilter;
    this.MovieList = this.MovieListWithoutFilter.filter(function(el){
        return el.MovieTitle.toString().toLowerCase().includes(
          MovieTitleFilter.toString().trim().toLowerCase()
        );
    });
  }

  sortResult(prop, asc){
    this.MovieList = this.MovieListWithoutFilter.sort(function(a, b){
      if (asc){
          return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }else{
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

}
