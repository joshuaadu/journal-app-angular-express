import { Routes } from "@angular/router";
import { EntriesComponent } from "./entries/entries.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EntryEditComponent } from "./entries/entry-edit/entry-edit.component";
import { EntryDetailComponent } from "./entries/entry-detail/entry-detail.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/entries",
    pathMatch: "full",
  },

  {
    path: "entries",
    component: EntriesComponent,
    children: [
      {
        path: "new",
        component: EntryEditComponent,
      },
      {
        path: ":id",
        component: EntryDetailComponent,
      },
      {
        path: ":id/edit",
        component: EntryEditComponent,
      },
    ],
  },
  { path: "**", component: NotFoundComponent },
];
