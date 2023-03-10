import {Component, OnInit} from '@angular/core';
import {Owner} from '../../../dto/owner';
import {OwnerService} from '../../../service/owner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HorseCreateEditMode} from "../../horse/horse-create-edit/horse-create-edit.component";
import {NgForm, NgModel} from "@angular/forms";
import {Observable} from "rxjs";
import {Horse} from "../../../dto/horse";

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.scss']
})
export class OwnerCreateComponent implements OnInit {
  owner: Owner = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(
    private service: OwnerService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: ToastrService,
  ) {
  }

  public get submitButtonText(): string {
    return 'Create';
  }

  public dynamicCssClassesForInput(input: NgModel): any {
    return {
      // This names in this object are determined by the style library,
      // requiring it to follow TypeScript naming conventions does not make sense.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'is-invalid': !input.valid && !input.pristine,
    };
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
    });
  }

  public onSubmit(form: NgForm): void {
    console.log('is form valid?', form.valid, this.owner);
    if (form.valid) {
      if (this.owner.email === '') {
        delete this.owner.email;
      }
      const observable = this.service.create(this.owner);
      observable.subscribe({
        next: data => {
          this.notification.success(`Owner ${this.owner.firstName} successfully added.`);
          this.router.navigate(['/owners']);
        },
        error: error => {
          console.error(`Error for adding owner`, error);
          // TODO show an error message to the user. Include and sensibly present the info from the backend!
        }
      });
    }
  }
}
