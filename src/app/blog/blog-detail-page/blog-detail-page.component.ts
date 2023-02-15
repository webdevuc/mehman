import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsCommentsService } from 'src/app/services/blogs-comments.service';
import { BlogsService } from 'src/app/services/blogs.service ';
import { ToasterService } from 'src/app/services/toastr-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss'],
})
export class BlogDetailPageComponent implements OnInit {
  categories: any[] = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Flight' },
    { id: 2, name: 'Hotel' },
    { id: 3, name: 'Holidays' },
    { id: 4, name: 'TravelAgent' },
    { id: 4, name: 'Visa' },
  ];
  blogsList: any[] = [];
  mostViewedblogsList: any[] = [];
  comments: any[] = [];
  blog: any = {};
  blogId: any;
  commentform: FormGroup;
  loading = false;
  submitted = false;
  content: string;

  constructor(
    private blogsService: BlogsService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private blogsCommentsService: BlogsCommentsService
  ) {
    this.blogId = this.route.snapshot.params.blogId;
  }

  ngOnInit(): void {
    this.commentform = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      comment: ['', Validators.required],
    });
    window.scrollTo(0, 0);
    this.getBlogs();
    this.getMostViewedBlogs();
    this.getBlogDetail(this.blogId);
    this.getAllComments(this.blogId);
  }

  getBlogDetail(id: any) {
    this.blogsService.getBlog(id).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.blog = response.data;
            this.content = this.blog.content;
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }

  getBlogs() {
    this.blogsService.getBlogs().subscribe((response) => {
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

  getImage(photo: any) {
    return 'data:image/png;base64,' + photo;
  }

  nextBlog(isNextBlog: boolean) {
    const blogIndex = this.blogsList.findIndex((x) => x.id == this.blogId);
    if (isNextBlog) {
      const blog = this.blogsList[blogIndex - 1];
      if (blog) {
        this.blogId = blog?.id;
      }
    } else {
      const blog = this.blogsList[blogIndex + 1];
      if (blog) {
        this.blogId = blog?.id;
      }
    }
    this.router.navigate([`/blog-detail/${this.blogId}`]);
    this.getBlogDetail(this.blogId);
    window.scrollTo(0, 0);
  }

  loadMostViewed(id: any) {
    this.blogId = id;
    this.getBlogDetail(this.blogId);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commentform.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentform.invalid) {
      return;
    }

    const commentModel = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      comment: this.f.comment.value,
      blogPostId: this.blogId,
    };

    this.blogsCommentsService
      .createBlogComment(commentModel)
      .subscribe((response) => {
        this.getAllComments(this.blogId);
        this.commentform.reset();
        this.submitted = false;
        // this.toasterService.showSuccess(
        //   'Thanks for submitting your comments. Your comments will be reviewed before publishing on this page',
        //   'Success'
        // );
        Swal.fire(
          'Thanks for submitting your comments. Your comments will be reviewed before publishing on this page',
          '',
          'success'
        );

      });
  }

  getAllComments(blogId: any) {
    this.blogsCommentsService.getBlogsComments(blogId).subscribe((response) => {
      if (response) {
        if (response.status === 'success') {
          if (response.data) {
            this.comments = [];
            this.comments = response.data;
          }
        } else {
          if (response.message) {
            this.toasterService.showError(response.message, 'Error');
          }
        }
      }
    });
  }
}
