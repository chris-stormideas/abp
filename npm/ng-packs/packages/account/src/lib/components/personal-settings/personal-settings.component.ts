import { GetProfile, Profile, ProfileState, UpdateProfile } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { ToasterService } from '@abp/ng.theme.shared';

const { maxLength, required, email } = Validators;

@Component({
  selector: 'abp-personal-settings-form',
  templateUrl: './personal-settings.component.html',
})
export class PersonalSettingsComponent implements OnInit {
  @Select(ProfileState.getProfile)
  profile$: Observable<Profile.Response>;

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private toasterService: ToasterService) {}

  buildForm() {
    this.store
      .dispatch(new GetProfile())
      .pipe(
        withLatestFrom(this.profile$),
        take(1),
      )
      .subscribe(([, profile]) => {
        this.form = this.fb.group({
          userName: [profile.userName, [required, maxLength(256)]],
          email: [profile.email, [required, email, maxLength(256)]],
          name: [profile.name || '', [maxLength(64)]],
          surname: [profile.surname || '', [maxLength(64)]],
          phoneNumber: [profile.phoneNumber || '', [maxLength(16)]],
        });
      });
  }

  submit() {
    if (this.form.invalid) return;

    this.store.dispatch(new UpdateProfile(this.form.value)).subscribe(() => {
      this.toasterService.success('AbpAccount::PersonalSettingsSaved', 'Success', { life: 5000 });
    });
  }

  ngOnInit() {
    this.buildForm();
  }
}
