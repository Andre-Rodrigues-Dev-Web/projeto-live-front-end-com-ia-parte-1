import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommunityService, CommunityItem } from '../../../../services/community.service';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-explore-communities',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './explore-communities.component.html',
  styleUrl: './explore-communities.component.scss'
})
export class ExploreCommunitiesComponent {
  communityService = inject(CommunityService);
  navService = inject(NavigationService);
  private fb = inject(FormBuilder);

  groups = this.communityService.groups;
  pages = this.communityService.pages;
  myGroups = this.communityService.myGroups;
  myPages = this.communityService.myPages;

  currentTab = this.navService.communitiesTab; // Bound to global state
  isCreateModalOpen = signal(false);

  createForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.maxLength(150)]],
    type: ['group', Validators.required],
    category: ['Tecnologia', Validators.required]
  });

  categories = ['Tecnologia', 'Cultura', 'Jogos', 'Notícias', 'Gastronomia', 'Saúde'];

  get nameCtrl() { return this.createForm.get('name')!; }
  get descCtrl() { return this.createForm.get('description')!; }

  setTab(tab: 'groups' | 'pages' | 'my-groups' | 'my-pages') {
    this.navService.setCommunitiesTab(tab);
  }

  joinGroup(id: number) { this.communityService.joinGroup(id); }
  leaveGroup(id: number) { this.communityService.leaveGroup(id); }
  followPage(id: number) { this.communityService.followPage(id); }
  unfollowPage(id: number) { this.communityService.unfollowPage(id); }

  openCreateModal() { 
    const isPage = this.currentTab() === 'pages' || this.currentTab() === 'my-pages';
    this.createForm.patchValue({ type: isPage ? 'page' : 'group' });
    this.isCreateModalOpen.set(true); 
  }
  closeCreateModal() { this.isCreateModalOpen.set(false); this.createForm.reset({ type: 'group', category: 'Tecnologia' }); }

  submitCreate() {
    if (this.createForm.valid) {
      const { name, description, type, category } = this.createForm.value;
      this.communityService.createItem(name!, description!, type as any, category!);
      this.closeCreateModal();
    }
  }
}
