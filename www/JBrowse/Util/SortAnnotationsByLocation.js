define([], function () {
    return function(annots) {
        return annots.sort(function(annot1, annot2) {
                               var start1 = annot1.get("start");
                               var end1 = annot1.get("end");
                               var start2 = annot2.get("start");
                               var end2 = annot2.get("end");
                               var type1 = annot1.get("type");
                               var type2 = annot2.get("type");

                               if (start1 != start2)  { return start1 - start2; }
                               else if (end1 != end2) { return end1 - end2; }
                               else                   {
                                   if (type1 === type2) {
                                       return 0;
                                   }
                                   else {
                                       if(type1 < type2) {
                                           return -1;
                                       }
                                       else {
                                           return 1;
                                       }
                                   }
                               }
                           });
    };
});
