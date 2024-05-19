import { Component, OnInit } from '@angular/core';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit{
  roles: any =[];

  constructor(private rolesService: RolesService) {}
  ngOnInit(): void {
    this.obtenerRoles();
    }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res:Rol) => {
      this.roles = res;
    });
  }
}
