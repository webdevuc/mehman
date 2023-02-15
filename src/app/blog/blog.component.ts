import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { BlogsService } from '../services/blogs.service ';
import { ToasterService } from '../services/toastr-service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  p: number = 0;
  responsiveOptions;
  blogs: any[] = [
    {
      id: 1,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image1.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 2,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image2.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 3,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image3.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 4,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image4.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 5,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image5.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 6,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image6.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 7,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image7.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 8,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image8.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 9,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image9.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 10,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image10.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 11,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image11.png',
      date: 'Book by Mar 27, 20',
    },
    {
      id: 12,
      content: 'A one-day Trip Through Banyuwangi',
      image: 'assets/images/blog/image12.png',
      date: 'Book by Mar 27, 20',
    },
  ];

  blogsList: any[] = [];
  mostViewedblogsList: any[] = [];

  mostViewedBlogs: any[] = [
    {
      id: 13,
      content: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image13.jpg',
      date: 'Mar 27, 20',
    },
    {
      id: 14,
      content: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image14.jpg',
      date: 'Mar 27, 20',
    },
    {
      id: 15,
      content: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image15.jpg',
      date: 'Mar 27, 20',
    },
    {
      id: 16,
      content: 'How to Train Your Kids for Travel So You Can Travel More',
      image: 'assets/images/blog/image16.jpg',
      date: 'Mar 27, 20',
    },
  ];

  categories: any[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Flight' },
    { id: 2, name: 'Hotel' },
    { id: 3, name: 'Holidays' },
    { id: 4, name: 'Visa' },
  ];

  
  sortOptions: Array<any>=[];

  sortOrder: number;

  sortField: string;


  constructor(
    private blogsService: BlogsService,
    private router: Router,
    private toasterService: ToasterService,
    private primengConfig: PrimeNGConfig
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getBlogs();
    this.getMostViewedBlogs();
    this.primengConfig.ripple = true;
  }

  getBlogs() {
    this.blogsService.getBlogsForHome().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.blogsList = [];
            this.blogsList = response.data;
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }

  getMostViewedBlogs() {
    this.blogsService.getMostViewedBlogs().subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.mostViewedblogsList = [];
            this.mostViewedblogsList = response.data;
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }

  getBlogsByCategory(categoryId: any) {
    if (categoryId > 0) {
      this.blogsService.getBlogsByCategory(categoryId).subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            if (response.data) {
              this.blogsList = [];
              this.blogsList = response.data;
              window.scrollTo(0, 0);
            }
          } else {
            if (response.message) {
              this.toasterService.showError(response.message, 'Error');
            }
          }
        }
      });
    } else {
      this.getBlogs();
    }
  }
  openBlogDetail(blog: any) {
    if (blog) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/blog-detail/${blog.title.split(' ').join('-')}/${blog.id}`])
      );
      window.open(url, '_blank');
    }
  }
  getImage(photo: any) {
    return 'data:image/png;base64,' + photo;
  }
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
