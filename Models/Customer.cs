using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsManagement.Models
{
    public class Customer
    {
        
        public int Id { get; set; }
       
        public string Name { get; set; }
       
        public string Address { get; set; }

        public ICollection<Sales> ProductSold { get; set; }
    }
}
