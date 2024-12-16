import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from 'src/app/core/services/movies.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {
	listGenres:any = [];
	listMovies:any = [];
	objDetail:any = {};
	search: string = "";
	currentPage = 1;
	totalPages = 0;
	
  	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
		public movieSer: MoviesService
	) {
		config.backdrop = 'static';
		config.keyboard = false;
		config.backdropClass = 'light-blue-backdrop'
		config.scrollable = true
	}

	/**
	 * 
	 */
	async ngOnInit() {
		this.currentPage = 1;
		this.getMovies(this.currentPage);
	}

	/**
	 * Metodo para listar las peliculas por pagina
	 * 
	 * @param page Pagina a mostrar
	 */
	async getMovies(page: number) {
		const {error, data}:any = await this.movieSer.getData(`${environment.URL_API}/movie/now_playing?language=en-US&page=${page}`);
		if(!error) {
			this.listMovies = [...data.results]
			this.totalPages = data.total_pages
		}
	}

	/**
	 * Metodo para abrir el modal de Detalle de la pelicula
	 * 
	 * @param content Modal a renderizar
	 * @param id Id de la pelicula a mostrar
	 */
	async openModalMovieDetail(content: TemplateRef<any>, id: number) {
		await this.getMovieDetail(id);
		await this.getCast(id);
		this.modalService.open(content);
	}

	/**
	 * Metodo para obtener los detalles de la pelicula a mostrar
	 * 
	 * @param movieId Id de la pelicula a mostrar
	 */
	async getMovieDetail(movieId: number) {
		this.objDetail = {...{}}
		this.objDetail.vote_average = 0;
		const {error, data}:any = await this.movieSer.getData(`${environment.URL_API}/movie/${movieId}?language=en-US`);
		
		if(!error) {
			this.objDetail = {...data}
		}
	}

	/**
	 * Metodo para obtener los datos del elenco de una pelicula
	 * 
	 * @param movieId Id de la pelicula a mostrar
	 */
	async getCast(movieId: number) {
		let list:any = []
		this.objDetail.Cast = "";
		const {error, data}:any = await this.movieSer.getData(`${environment.URL_API}/movie/${movieId}/credits?language=en-US`);
		
		if(!error) {
			data.cast.map((item:any) => {
				list.push(item.name);
			});
			this.objDetail.Cast = list.join(", ")
		}
	}

	/**
	 * Metodo para buscar peliculas por titulo
	 */
	async searchMovie() {
		this.currentPage = 1;
		if(this.search.trim() != "") {
			const {error, data}:any = await this.movieSer.getData(`${environment.URL_API}/search/movie?query=${this.search}&include_adult=false&language=en-US&page=${this.currentPage}`);
			if(!error) {
				this.listMovies = [...data.results]
				this.totalPages = data.total_pages
			}
			
		} else {
			this.getMovies(this.currentPage);
		}
		
	}

	/**
	 * Metodo para consultar los datos de la pagina seleccionada en la paginacion
	 * 
	 * @param page Pagina a seleccionar
	 */
	selectPage(page: number) {	
		this.currentPage = page;
		if(this.search.trim() != "") {
			this.searchMovie();
		} else {
			this.getMovies(this.currentPage);
		}
	}
}
